.PHONY: help dev start stop clean install

help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Installe les dépendances de tous les services
	@echo "📦 Installation des dépendances du frontend..."
	cd frontend && bun install
	@echo "📦 Installation des dépendances de Strapi..."
	cd strapi && npm install
	@echo "✅ Installation terminée"

dev: ## Lance tous les services en développement
	@echo "🚀 Démarrage de tous les services..."
	@echo "🐳 Démarrage de Docker Compose (PostgreSQL)..."
	docker compose up -d
	@echo "⏳ Attente de la disponibilité de la base de données..."
	@sleep 3
	@echo "🎨 Démarrage du frontend (Next.js)..."
	@cd frontend && bun dev > /dev/null 2>&1 & echo $$! > ../.frontend.pid
	@echo "🔧 Démarrage de Strapi..."
	@cd strapi && npm run develop > /dev/null 2>&1 & echo $$! > ../.strapi.pid
	@echo "✅ Tous les services sont démarrés !"
	@echo "📱 Frontend: http://localhost:3000"
	@echo "🔧 Strapi: http://localhost:1337/admin"
	@echo ""
	@echo "Pour arrêter les services, utilisez: make stop"

start: dev ## Alias pour 'make dev'

stop: ## Arrête tous les services
	@echo "🛑 Arrêt des services..."
	@if [ -f .frontend.pid ]; then \
		kill -9 $$(cat .frontend.pid) 2>/dev/null || true; \
		rm .frontend.pid; \
		echo "✅ Frontend arrêté"; \
	fi
	@if [ -f .strapi.pid ]; then \
		kill -9 $$(cat .strapi.pid) 2>/dev/null || true; \
		rm .strapi.pid; \
		echo "✅ Strapi arrêté"; \
	fi
	@docker compose down
	@echo "✅ Docker Compose arrêté"
	@echo "✅ Tous les services sont arrêtés"

clean: stop ## Arrête les services et nettoie les fichiers temporaires
	@echo "🧹 Nettoyage..."
	@rm -f .frontend.pid .strapi.pid
	@echo "✅ Nettoyage terminé"

logs-frontend: ## Affiche les logs du frontend
	@tail -f frontend/.next/trace 2>/dev/null || echo "Aucun log disponible"

logs-strapi: ## Affiche les logs de Strapi
	@cd strapi && npm run develop

logs-db: ## Affiche les logs de PostgreSQL
	@docker compose logs -f db
