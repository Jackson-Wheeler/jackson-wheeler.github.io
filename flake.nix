{
  description = "jackson-wheeler.github.io — Astro dev environment";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in {
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell {
          packages = [ pkgs.nodejs_26 ];
          shellHook = ''
            # Auto-install deps when node_modules is missing or package-lock.json changed.
            if [ -f package-lock.json ]; then
              lock_hash=$(sha256sum package-lock.json | cut -d' ' -f1)
              stamp=node_modules/.package-lock.sha256
              if [ ! -d node_modules ] || [ "$(cat "$stamp" 2>/dev/null)" != "$lock_hash" ]; then
                echo "package-lock.json changed or node_modules missing; running npm ci..."
                npm ci --no-audit --no-fund && echo "$lock_hash" > "$stamp"
              fi
            fi
          '';
        };
      });
    };
}
