Document the feature: $ARGUMENTS

## Instructions

### Step 1: Analyze the Feature
- Search the codebase for all files related to "$ARGUMENTS" (components, API routes, utilities, types, styles, tests)
- Determine if the feature is **frontend-only**, **backend-only**, or **full-stack** based on which directories contain relevant code
- Identify the entry points, data flow, and key dependencies

### Step 2: Check Existing Documentation
- Look in `docs/` for any existing documentation that relates to this feature
- Note any existing docs that should be cross-referenced

### Step 3: Generate Developer Documentation
Create the file `docs/dev/$ARGUMENTS-implementation.md` (kebab-case the feature name) with this structure:

```
# [Feature Name] - Technical Documentation

> **Feature Type:** [Frontend | Backend | Full-Stack]
> **Last Updated:** [today's date]
> **Related User Guide:** [../user/how-to-FEATURE.md](../user/how-to-FEATURE.md)

## Overview
[Brief technical summary of what the feature does and why it exists]

## Architecture
[Describe the high-level architecture - how components/modules interact]

### Key Files
| File | Purpose |
|------|---------|
| `path/to/file` | Description |

### Data Flow
[Describe how data moves through the system for this feature]

## API Reference
[If backend/full-stack: document all endpoints, request/response schemas, status codes]
[If frontend-only: document props, hooks, context, or state management interfaces]

### [Endpoint or Interface Name]
- **Method/Type:**
- **Path/Import:**
- **Parameters:**
- **Returns:**
- **Example:**

## Implementation Details
[Key algorithms, business logic, edge cases, and technical decisions]

## Dependencies
[External packages and internal modules this feature relies on]

## Error Handling
[How errors are caught, reported, and recovered from]

## Testing
[Describe existing tests and how to run them]

## Related Documentation
[Links to related dev docs and the user guide]
- User Guide: [How to FEATURE](../user/how-to-FEATURE.md)
```

### Step 4: Generate User Documentation
Create the file `docs/user/how-to-$ARGUMENTS.md` (kebab-case the feature name) with this structure:

```
# How to [Feature Name]

> **Related Technical Docs:** [../dev/FEATURE-implementation.md](../dev/FEATURE-implementation.md)

## What This Feature Does
[1-2 sentence plain-language explanation]

## Getting Started

### Prerequisites
[What the user needs before using this feature]

## Step-by-Step Guide

### Step 1: [Action]
[Clear instruction in plain language]

![Step 1 screenshot](../assets/screenshots/FEATURE-step-1.png)
<!-- TODO: Capture screenshot showing [describe what should be visible] -->

### Step 2: [Action]
[Clear instruction in plain language]

![Step 2 screenshot](../assets/screenshots/FEATURE-step-2.png)
<!-- TODO: Capture screenshot showing [describe what should be visible] -->

[Continue for each step...]

## Common Tasks
[List frequent use cases with brief instructions]

## Troubleshooting
[Common problems and solutions based on error handling found in the code]

## FAQ
[Anticipated questions based on the feature's complexity]

## Related Guides
[Links to other user docs that relate to this feature]
```

### Step 5: Create Supporting Directories
- Ensure `docs/dev/`, `docs/user/`, and `docs/assets/screenshots/` directories exist

### Step 6: Adjust for Feature Type
- **Frontend-only features:** In dev docs, focus on component architecture, props, state, and UI behavior. In user docs, emphasize visual steps with more screenshot placeholders.
- **Backend-only features:** In dev docs, focus on API contracts, database changes, and service logic. In user docs, focus on API usage examples or admin instructions.
- **Full-stack features:** Include both frontend and backend sections in dev docs. User docs should cover the complete end-to-end workflow.

### Step 7: Cross-Reference Existing Docs
- Scan `docs/` for any existing documentation
- Add links to and from related existing docs where relevant
- If this feature extends or depends on a previously documented feature, note that relationship in both new files

## Output
After generating both files, provide a summary of:
1. Feature type detected (frontend/backend/full-stack)
2. Files created
3. Key files analyzed
4. Any screenshot TODOs that need manual capture
5. Cross-references added to existing docs
