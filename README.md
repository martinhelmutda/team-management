# team-management
# READ ME DRAFT
## Quick Start

1. Clone:
```bash 
git clone https: //github.com/your-username/team-management.git 
cd team-management
```

2. Virtual environment:
```bash 
python -m venv venv 
source venv/bin/activate
```

3. Install:
```bash
make install

# If you do not use make, then run 
pip install -r requirements/requirements_dev.txt
```

4. Copy `.env.template`to `.env`and set env variables


## Solution Approach
### Backend
The goal is to build a simple, maintainable Django app using solid coding practices. The tech stack is intentionally lightweight, but the project is structured to support multiple environments (e.g., development, production) if needed.


## Implementation Details
The backend is built with Django and uses SQLite for the database.

To streamline development and enforce quality, the project includes:
- **Makefile**: for running common commands
- **Ruff**: for linting and keeping the code clean
- **Swagger**: for API documentation. URL `{{host}}/api/schema/swagger-ui/`

## Decisions and Trade-offs
SQLite is used for this take-home project because it's lightweight, easy to set up, and doesn't require running a separate database server. It simplifies running commands like `makemigrations`, `migrate`, and loading test data, which makes it easier to share and run the project without extra setup.

PostgreSQL is a more robust option for production, but for a small demo like this, it's unnecessary and would add complexity without real benefit.

## Future Improvements if needed
- Use Postgresql as main Database
- Add Docker setup
- Create multiple Teams and assign TeamMembers

## Testing Strategy
Unit Testing with mocked data
