.PHONY: run makemigrations migrate createsuperuser shell
ENV ?= dev

help:
	@echo "Current ENV: $(ENV)"
	@echo "Available commands:"
	@echo "  run                Run backend and frontend in a tmux session concurrently"
	@echo "  makemigrations     Create new database migrations"
	@echo "  migrate            Apply database migrations"
	@echo "  createsuperuser    Create a new superuser"
	@echo "  install			Install backend and frontend dependencies"
	@echo "  freeze             Freeze current dependencies to requirements file"
	@echo "  lint               Run linter on the codebase"
	@echo "  format             Format the codebase using ruff"

run:
	@echo "Starting backend and frontend..."
	@tmux new-session -d -s team-management 'source venv/bin/activate && python manage.py runserver'
	@tmux split-window -h -t team-management 'cd frontend && npm run dev'
	@tmux attach-session -t team-management

makemigrations:
	python manage.py makemigrations

migrate:
	python manage.py migrate

createsuperuser:
	python manage.py createsuperuser

lint:
	ruff check .

format:
	@echo "Formatting codebase..."
	black .
	isort .
	ruff format .

install:
	@echo "Installing dependencies for environment: $(ENV)"
	pip install -r requirements/requirements_$(ENV).txt
	cd frontend && npm install

freeze:
	pip freeze > requirements/requirements_$(ENV).txt