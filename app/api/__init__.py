from pkgutil import iter_modules
from importlib import import_module

routers = []

package = __name__

for _, module_name, _ in iter_modules(__path__):
    module = import_module(f"{package}.{module_name}")
    if hasattr(module, "router"):
        routers.append(module.router)