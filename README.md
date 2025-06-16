# Team Management app
A simple team-member management application that allows the
user to view, edit, add, and delete team members.

## Quick Start
This project includes both a backend and a frontend that need to run simultaneously.


#### Prerequisites
- [Make](https://www.gnu.org/software/make/) must be installed to run the provided Makefile commands.

#### Steps:
1. Clone:
    ```bash 
    git clone https://github.com/your-username/team-management.git 
    cd team-management
    ```

2. Set up virtual environment:
    ```bash 
    python -m venv venv 
    source venv/bin/activate
    ```

3. Install dependencies:
    ```bash
    make install
    make install_frontend
    ```

4. Set environment variables for Backend
    
    Copy `.env.template`to `.env`and set env variables if needed
    
    The frontend dev server runs on `http://localhost:5173` by default.

5. Set environment variable for Frontend
    
    Copy `.env.template`to `.env`and set env variables if needed
    ```bash
    cp frontend/.env.template frontend/.env
    ```


6. Development servers:

    Open two terminal windows or tabs at the root of the project and run the following commands separately:
    ```bash
    # Terminal 1
    make run

    # Terminal 2
    make run_frontend
    ```

## Solution Approach
### Backend
The goal is to build a simple, maintainable Django app using solid coding practices. The tech stack is intentionally lightweight, but the project is structured to support multiple environments (e.g., development, production) if needed.

### Frontend
The frontend must provide a fast and modern development experience. The structure of te codebase should promote component reusability, type safety and clear separation of concerns.

## Implementation Details
### Backend
The backend is built with Django and uses SQLite for the database.

To streamline development and enforce quality, the project includes:
- **Makefile**: for running common commands
- **Ruff**: for linting and keeping the code clean
- **Swagger**: for API documentation. URL `{{host}}/api/schema/swagger-ui/`

### Frontend
Built with React and TypeScript for type-safe components, using Vite for fast builds and Hot Module Replacement. Material UI is used for consistent styling.

## Decisions and Trade-offs
SQLite is used for this take-home project because it's lightweight, easy to set up, and doesn't require running a separate database server. It simplifies running commands like `makemigrations`, `migrate`, and loading test data, which makes it easier to share and run the project without extra setup.

PostgreSQL is a more robust option for production, but for a small demo like this, it's unnecessary and would add complexity without real benefit.

Vite has a simple setup and a built-in support for React/Typescript. This tool is not as mature as Webpack, Next.js or other alternatives but it is perfect for small projects.

## Future Improvements if needed
- Use Postgresql as main database
- Add Docker setup
- Create multiple teams and assign team members
- Use UUIDs for team member IDs
- Centralize frontend API calls in a `services/` directory
- Add login functionality

## Testing Strategy
### Backend
Unit Testing with mocked data.
