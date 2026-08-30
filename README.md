# koras-e2e-shop

`koras-e2e-shop` is a KORAS SaaS product generated from `koras-saas-starter`.

| | |
|---|---|
| **Profile** | `product` |
| **Slug** | `koras-e2e-shop` |
| **Generator** | `create-koras-app` |
| **Registers with Control Plane** | yes — `/api/platform/v1/products` |

## Generated components

**Applications**
- `apps/admin` (admin)
- `apps/web` (web)

**Services**
- `services/api` (api)
- `services/worker` (worker)

## Quick start

```bash
make bootstrap   # first-time setup
make dev         # start the local stack
make health      # verify all services, and print their URLs
make down        # stop containers
make ports       # re-resolve host ports
```

### Host ports are resolved, not fixed

A host port is a machine-global resource, so this project does not claim fixed
ones. `make bootstrap` runs `local/scripts/ports.sh`, which keeps each preferred
port when it is free and takes the next free one when it is not, recording the
result in `local/.env` — read by Docker Compose, the Caddyfile, and the app dev
servers alike. The file is machine-specific and is not committed.

Assignments are reused once made, so URLs stay stable across restarts. Run
`make ports` to re-resolve after freeing a port you would rather have. Because
the proxy does not bind 443, application URLs carry its HTTPS port; `make health`
prints the current ones.

Run `make profile` to print the profile and enabled components at any time.

### On Windows, run the scripts under Git Bash

`bash` from PowerShell is `C:\WINDOWS\system32\bash.exe` — the WSL launcher.
WSL is a separate Linux filesystem and cannot see a winget or Scoop install on
the Windows side, so `local/scripts/*.sh` will report that `doppler`,
`terraform` or `python` "is not installed" when it is. Either use a Git Bash
terminal, name it explicitly:

```bash
"C:/Program Files/Git/bin/bash.exe" local/scripts/doppler-bootstrap.sh
```

or add this to your PowerShell profile, which leaves WSL reachable as `wsl`:

```powershell
function bash { & 'C:\Program Files\Git\bin\bash.exe' @args }
```

`make` targets are unaffected — make resolves `bash` itself and finds Git Bash.

**Without `make`** (Windows without Git Bash's make, or a minimal container),
the same steps are pnpm scripts:

```bash
pnpm bootstrap      # = make bootstrap
pnpm stack:up       # = make dev   (containers only; `pnpm dev` runs the apps)
pnpm stack:health   # = make health
pnpm stack:down     # = make down
pnpm stack:ports    # = make ports
pnpm stack:reset    # wipe volumes
```

## Environments

| Environment | Branch | Doppler | Supabase |
|---|---|---|---|
| `dev` | `develop` | `koras-e2e-shop-dev` | `koras-e2e-shop-dev` |
| `test` | `test` | `koras-e2e-shop-test` | `koras-e2e-shop-test` |
| `stg` | `staging` | `koras-e2e-shop-stg` | `koras-e2e-shop-stg` |
| `prod` | `main` | `koras-e2e-shop-prod` | `koras-e2e-shop-prod` |

ZITADEL project name is `koras-e2e-shop` in every instance — the instance
itself represents the environment, so no suffix is applied.

## Infrastructure

- **Vercel projects:** `koras-e2e-shop-web` `koras-e2e-shop-admin` 
- **Fly apps:** `koras-e2e-shop-api-dev` `koras-e2e-shop-worker-dev` `koras-e2e-shop-api-test` `koras-e2e-shop-worker-test` `koras-e2e-shop-api-stg` `koras-e2e-shop-worker-stg` `koras-e2e-shop-api-prod` `koras-e2e-shop-worker-prod` 
- **Supabase region:** `us-east-1`
- **Fly region:** `iad`

Terraform lives in `infrastructure/terraform`. It never auto-applies — every
apply requires explicit human approval.

## Secrets

Doppler is the sole secret authority. Nothing is committed to this repository.
