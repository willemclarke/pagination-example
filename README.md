Sitemate self proctored rest api challenge (2hr time limit - including recording loom video)

Things to improve:

1. Add error handling
2. Ensure onClick functions in client have mutations in the dependency array (forgot in the heat of battle)
3. On mutation success - invalidate the `issues` queryKey instead of calling `issuesQuery.refetch` (forgot the syntax and had like 5 minutes left to record loom before timer ran out)
4. Nicer UI
5. Perhaps some unit tests in backend

To run:

1. Clone,
2. `bun install`
3. in 1 pane: `bun run server:dev`
4. in another pane: `bun run client:dev`

Tech:

- Bun <3
- typescript
- react
- express
- react-query
