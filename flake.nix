{
  description = "Dev shell for jackson-wheeler.github.io (Docusaurus)";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";

  outputs = { self, nixpkgs }:
    let
      systems = [ "aarch64-darwin" "x86_64-darwin" "x86_64-linux" ];
      # Node 20 is upstream EOL (2026-04-30) and flagged insecure in nixpkgs;
      # permitted explicitly so the shell matches CI / package.json engines.
      # TODO: move shell + CI to nodejs_22.
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f (import nixpkgs {
        inherit system;
        config.permittedInsecurePackages = [ "nodejs-20.20.2" "nodejs-slim-20.20.2" ];
      }));
    in
    {
      devShells = forAllSystems (pkgs: {
        default = pkgs.mkShell {
          packages = [ pkgs.nodejs_20 pkgs.git ];
          shellHook = ''
            echo "node $(node --version) ready. Run 'npm ci' to install Docusaurus, then 'npm start'."
          '';
        };
      });
    };
}
