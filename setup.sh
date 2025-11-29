#!/bin/bash

python3.13 -m venv .venv
source .venv/bin/activate
pip install .
echo "Виртуальное окружение создано в .venv и зависимости установлены!"