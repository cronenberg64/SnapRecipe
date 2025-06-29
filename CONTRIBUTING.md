# Contributing to SnapRecipe

Thank you for your interest in contributing to SnapRecipe! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

## How Can I Contribute?

### Reporting Bugs

- Use the GitHub issue tracker
- Include detailed steps to reproduce the bug
- Provide system information (OS, browser, etc.)
- Include screenshots if applicable
- Use the bug report template

### Suggesting Enhancements

- Use the GitHub issue tracker
- Describe the enhancement clearly
- Explain why this enhancement would be useful
- Include mockups or examples if possible

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Ensure all tests pass
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Local Development

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see README.md)
4. Run the development server: `npm run dev`
5. Make your changes
6. Run tests: `npm test`
7. Build the project: `npm run build`

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Follow strict type checking
- Use interfaces for object shapes
- Prefer const assertions where appropriate

### React/Next.js

- Use functional components with hooks
- Follow React best practices
- Use proper prop types and interfaces
- Implement proper error boundaries

### Styling

- Use Tailwind CSS for styling
- Follow the design system in `components.json`
- Use shadcn/ui components when possible
- Maintain responsive design principles

### Code Style

- Use Prettier for code formatting
- Follow ESLint rules
- Write meaningful commit messages
- Add JSDoc comments for complex functions

## Testing

- Write unit tests for new features
- Ensure existing tests pass
- Add integration tests for critical paths
- Test on multiple devices and browsers

## Documentation

- Update README.md if needed
- Add JSDoc comments for new functions
- Update API documentation
- Include examples for new features

## Commit Message Guidelines

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance tasks

## Review Process

1. All PRs require at least one review
2. Address review comments promptly
3. Maintainers may request changes
4. PRs are merged after approval

## Getting Help

- Check existing issues and discussions
- Join our community discussions
- Contact maintainers for urgent issues

Thank you for contributing to SnapRecipe! 