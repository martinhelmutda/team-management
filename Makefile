.PHONY: run makemigrations migrate createsuperuser shell
ENV ?= dev

help:
	@echo "Current ENV: $(ENV)"
	@echo "Available commands:"
	@echo "  run                Run the Django development server"
	@echo "  run_frontend       Run the frontend development server"
	@echo "  install			Install dependencies for the current environment"
	@echo "  install_frontend   Install frontend dependencies"
	@echo "  makemigrations     Create new database migrations"
	@echo "  migrate            Apply database migrations"
	@echo "  createsuperuser    Create a new superuser"
	@echo "  freeze             Freeze current dependencies to requirements file"
	@echo "  lint               Run linter on the codebase"
	@echo "  format             Format the codebase using ruff"
	@echo "  test               Run tests"

run:
	python manage.py runserver

makemigrations:
	python manage.py makemigrations

migrate:
	python manage.py migrate

createsuperuser:
	python manage.py createsuperuser

lint:
	ruff check .

format:
	black .
	isort .
	ruff format .

install:
	pip install -r requirements/requirements_$(ENV).txt

freeze:
	pip freeze > requirements/requirements_$(ENV).txt

run_frontend:
	cd frontend && npm run dev

install_frontend:
	cd frontend && npm install

test:
	python manage.py test
