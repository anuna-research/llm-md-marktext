# llm-md-marktext JavaScript Style Guide

## Core Principles
- Write clean, maintainable code
- Favor functional programming patterns where appropriate
- Follow consistent formatting and naming conventions
- Use modern JavaScript features judiciously

## File Basics
- Use UTF-8 encoding with `.js` extension
- Filenames should be lowercase with hyphens (`my-file.js`)
- Organize files as: license → JSDoc → imports → implementation

## Syntax & Formatting
- Indent with 2 spaces, never tabs
- 80 character line limit (except for imports/requires)
- Use K&R style braces:
  ```javascript
  if (condition) {
    doSomething();
  } else {
    doSomethingElse();
  }
  ```
- Always use braces for control structures
- Empty blocks may be `{}` (except in multi-block statements)
- Always terminate statements with semicolons
- When line-wrapping, break at higher syntactic levels

## Variables & Data Structures
- Use `const` by default, `let` when necessary, never `var`
- One variable per declaration
- Declare variables close to first use
- Use trailing commas in multiline arrays/objects
- Use array/object literals instead of constructors:
  ```javascript
  // Good
  const arr = [1, 2, 3];
  const obj = {a: 1, b: 2};

  // Bad
  const arr = new Array(1, 2, 3);
  const obj = new Object();
  ```

## Functions
- Prefer arrow functions for callbacks and anonymous functions
- Use default parameters instead of conditional logic
- Use rest parameters instead of `arguments`
- Document parameters and return types with JSDoc
- Apply functional programming principles:
  ```javascript
  // Pure function
  const add = (a, b) => a + b;

  // Higher-order function
  const map = (fn, arr) => arr.map(fn);

  // Immutability
  const addToList = (list, item) => [...list, item];
  ```

## Classes
- Use ES6 class syntax
- Define all fields in the constructor
- Use method shorthand syntax
- Mark private fields with `@private` and optional underscore
- Consider functional alternatives to classes where appropriate

## Strings
- Use single quotes for string literals
- Use template literals for multiline or interpolated strings
- Don't use line continuations with backslashes

## Naming Conventions
- `lowerCamelCase` for variables, functions, methods
- `UpperCamelCase` for classes, interfaces, types
- `CONSTANT_CASE` for constants
- Private fields may have trailing underscore: `this.field_`

## Modules & Imports
- Prefer ES modules over other module systems
- Use named exports instead of default exports
- Keep import statements unbroken
- Sort imports alphabetically

## Documentation
- Use JSDoc for documenting functions, classes, and types
- Write JSDoc in Markdown syntax
- Specify parameter and return types
- Use `@private`, `@protected`, etc., for visibility
- Use nullability modifiers: `!` (non-null) and `?` (nullable)

## Functional Programming Practices
- Prefer immutability (use `const`, avoid modifying objects)
- Use pure functions that avoid side effects
- Leverage higher-order functions like `map`, `filter`, `reduce`
- Use composition over inheritance when possible
- Prefer expressions over statements
- Avoid mutation in loops; use functional alternatives

## Error Handling
- Use exceptions for exceptional conditions
- Always throw Error objects, not literals
- Don't leave empty catch blocks without explanation

## Testing Approaches
- Write unit tests for pure functions first—they're easiest to test
- Test behaviors, not implementation details
- Use descriptive test names that explain expected behavior
- Structure tests with arrange-act-assert pattern:
  ```javascript
  it('should add two numbers', () => {
    // Arrange
    const a = 5, b = 3;

    // Act
    const result = add(a, b);

    // Assert
    expect(result).toBe(8);
  });
  ```
- Test edge cases and error conditions explicitly
- Use property-based testing for pure functions when possible
- Mock dependencies, not the unit under test
- Prefer functional tests with immutable inputs/outputs
- Group related tests into logical test suites
- Use test doubles (spies, stubs) rather than complex mocks when possible
- Keep tests fast and independent of each other
- Follow same coding style in tests as in production code

## Best Practices
- Never use `with`, `eval()`, or non-standard features
- Follow the principle of least surprise
- Make your code self-documenting
- Be consistent with existing code when making changes
