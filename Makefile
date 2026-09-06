PHP_HOST ?= 127.0.0.1
PHP_PORT ?= 8080
PHP_INI  ?= php.ini
CLASSIFIED_SRC ?= classified
CLASSIFIED_DST ?= /opt/kumari_classified
FLAG_DST       ?= /opt/ctf/flag.txt
FLAG_VALUE     ?= CYV{TENMADURAI_ARCHIVE_2026}
HTML_DIR       ?= html
FRONTEND_DIR   ?= frontend
DIST_SRC       ?= $(FRONTEND_DIR)/dist
DIST_DST       ?= $(HTML_DIR)/dist

PHP      ?= php
COMPOSER ?= composer
NPM      ?= npm
SUDO     ?= sudo

.PHONY: help install build setup run dev clean lint

help:
	@echo "Usage: make [target]"
	@echo "  install  - composer install + npm install"
	@echo "  build    - vite build + sync to html/dist"
	@echo "  setup    - create tmp dirs, classified copy, flag (needs sudo for /opt)"
	@echo "  run      - build + setup + php -S $(PHP_HOST):$(PHP_PORT) -t $(HTML_DIR)"
	@echo "  dev      - run vite dev (proxies /contact.php to php server)"
	@echo "  clean    - remove frontend/dist, node_modules, vendor"

install:
	@command -v $(PHP) >/dev/null || (echo "php not found" && exit 1)
	@command -v $(COMPOSER) >/dev/null || (echo "composer not found" && exit 1)
	@command -v $(NPM) >/dev/null || (echo "npm/node not found" && exit 1)
	cd $(HTML_DIR) && $(COMPOSER) install --no-interaction --prefer-dist
	cd $(FRONTEND_DIR) && $(NPM) install

build:
	cd $(FRONTEND_DIR) && $(NPM) run build
	rm -rf $(DIST_DST)
	mkdir -p $$(dirname $(DIST_DST))
	cp -r $(DIST_SRC) $(DIST_DST)
	@echo "frontend built -> $(DIST_DST)"

setup:
	mkdir -p $(HTML_DIR)/tmp/error_logs
	chmod -R 775 $(HTML_DIR) 2>/dev/null || chmod -R 775 $(HTML_DIR)/tmp
	@if [ -d "$(CLASSIFIED_DST)" ] && [ -w "$(CLASSIFIED_DST)" ]; then \
		cp -r $(CLASSIFIED_SRC)/* $(CLASSIFIED_DST)/; \
		chmod -R 750 $(CLASSIFIED_DST); \
	elif command -v $(SUDO) >/dev/null 2>&1; then \
		$(SUDO) mkdir -p $(CLASSIFIED_DST) $(dir $(FLAG_DST)); \
		$(SUDO) cp -r $(CLASSIFIED_SRC)/* $(CLASSIFIED_DST)/; \
		$(SUDO) chmod -R 750 $(CLASSIFIED_DST); \
		$(SUDO) chown -R www-data:www-data $(CLASSIFIED_DST) 2>/dev/null || $(SUDO) chown -R $$(whoami) $(CLASSIFIED_DST); \
		$(SUDO) sh -c 'echo "$(FLAG_VALUE)" > $(FLAG_DST)'; \
		$(SUDO) chmod 640 $(FLAG_DST); \
		$(SUDO) chown root:www-data $(FLAG_DST) 2>/dev/null || true; \
		echo "classified -> $(CLASSIFIED_DST), flag -> $(FLAG_DST)"; \
	else \
		echo "WARN: no sudo and $(CLASSIFIED_DST) not writable."; \
		echo "  mkdir -p /tmp/kumari && cp classified/* /tmp/kumari/ then"; \
		echo "  sudo ln -sfn $$(pwd)/classified $(CLASSIFIED_DST)"; \
		exit 1; \
	fi
	@if [ ! -f "$(FLAG_DST)" ]; then \
		if command -v $(SUDO) >/dev/null 2>&1; then \
			$(SUDO) mkdir -p $$(dirname $(FLAG_DST)); \
			$(SUDO) sh -c 'echo "$(FLAG_VALUE)" > $(FLAG_DST)'; \
			$(SUDO) chmod 640 $(FLAG_DST); \
		fi; \
	fi

run: build setup
	@echo "Starting php -S http://$(PHP_HOST):$(PHP_PORT) -t $(HTML_DIR) -c $(PHP_INI)"
	@echo "  robots.txt -> http://$(PHP_HOST):$(PHP_PORT)/robots.txt"
	@echo "  backups    -> http://$(PHP_HOST):$(PHP_PORT)/backups/db_backup.sql"
	$(PHP) -S $(PHP_HOST):$(PHP_PORT) -t $(HTML_DIR) -c $(PHP_INI)

dev:
	@make -j2 run vite

vite:
	cd $(FRONTEND_DIR) && $(NPM) run dev

lint:
	cd $(FRONTEND_DIR) && $(NPM) run lint || true
	$(PHP) -l $(HTML_DIR)/index.php
	$(PHP) -l $(HTML_DIR)/admin.php
	$(PHP) -l $(HTML_DIR)/contact.php
	$(PHP) -l $(HTML_DIR)/config.php

clean:
	rm -rf $(FRONTEND_DIR)/dist $(FRONTEND_DIR)/node_modules
	rm -rf $(HTML_DIR)/vendor $(HTML_DIR)/tmp/error_logs/*

