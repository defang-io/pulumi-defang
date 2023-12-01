{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = [
    pkgs.nixfmt
    pkgs.nodejs-18_x
    pkgs.pulumi-bin
  ];
}
