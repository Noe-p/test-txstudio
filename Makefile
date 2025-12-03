.PHONY: install up down dev-front dev-strapi

FRONT_DIR := frontend
STRAPI_DIR := strapi
DOCKER_COMPOSE := docker compose

install:
	@if command -v bun >/dev/null 2>&1; then \
		echo "Installing frontend with bun"; \
		cd $(FRONT_DIR) && bun install; \
	else \
		echo "Installing frontend with npm"; \
		cd $(FRONT_DIR) && npm install; \
	fi
	@echo "Installing strapi with npm"
	@cd $(STRAPI_DIR) && npm install

up:
	@$(DOCKER_COMPOSE) up -d db

down:
	@$(DOCKER_COMPOSE) down

dev.front:
	@if command -v bun >/dev/null 2>&1; then \
		cd $(FRONT_DIR) && bun run dev; \
	else \
		cd $(FRONT_DIR) && npm run dev; \
	fi

dev.strapi: up
	@cd $(STRAPI_DIR) && npm run dev
