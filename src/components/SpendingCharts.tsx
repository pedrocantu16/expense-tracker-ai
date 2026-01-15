'use client';

import { useExpenses } from '@/context/ExpenseContext';
import { formatCurrency } from '@/lib/utils';
import { EXPENSE_CATEGORIES, CATEGORY_COLORS, CATEGORY_ICONS } from '@/types/expense';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

// Custom tooltip for bar chart - defined outside component to avoid recreating on each render
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-sm text-emerald-600 font-semibold">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
}

// Custom tooltip for pie chart - defined outside component to avoid recreating on each render
function PieTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; value: number; icon: string } }> }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-gray-900">
          {data.icon} {data.name}
        </p>
        <p className="text-sm text-emerald-600 font-semibold">{formatCurrency(data.value)}</p>
      </div>
    );
  }
  return null;
}

export default function SpendingCharts() {
  const { summary, isLoading } = useExpenses();

  // Prepare data for pie chart
  const categoryData = EXPENSE_CATEGORIES.map((cat) => ({
    name: cat,
    value: summary.categoryBreakdown[cat],
    icon: CATEGORY_ICONS[cat],
    color: CATEGORY_COLORS[cat],
  })).filter((item) => item.value > 0);

  // Prepare data for bar chart (monthly trend)
  const monthlyData = summary.monthlyTrend.map((item) => ({
    ...item,
    fill: '#10B981',
  }));

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-40 mb-6" />
            <div className="h-64 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  const hasData = summary.totalSpending > 0;

  if (!hasData) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No data to display</h3>
        <p className="text-gray-500">Add some expenses to see your spending analytics.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Trend Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Spending Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6B7280" />
              <YAxis tick={{ fontSize: 12 }} stroke="#6B7280" tickFormatter={(value) => `$${value}`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Spending by Category</h3>
        {categoryData.length > 0 ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend
                  formatter={(value) => {
                    const data = categoryData.find((d) => d.name === value);
                    return (
                      <span className="text-sm text-gray-600">
                        {data?.icon} {value}
                      </span>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500">
            No category data available
          </div>
        )}
      </div>

      {/* Category Breakdown List */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm lg:col-span-2">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXPENSE_CATEGORIES.map((category) => {
            const amount = summary.categoryBreakdown[category];
            const percentage = summary.totalSpending > 0 ? (amount / summary.totalSpending) * 100 : 0;

            return (
              <div key={category} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${CATEGORY_COLORS[category]}15` }}
                >
                  {CATEGORY_ICONS[category]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{category}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-600">{formatCurrency(amount)}</p>
                    <span className="text-xs text-gray-400">({percentage.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: CATEGORY_COLORS[category],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
