# pulumi-defang
Typescript Pulumi provider for the Defang Opinionated Platform.

This [Dynamic Resource Provider](https://www.pulumi.com/docs/intro/concepts/resources/dynamic-providers/) allows you to manage your container services on the Defang Opinionated Platform. It was modelled after the [Compose Spec](https://www.compose-spec.io).

## Install

The provider is available through NPM from the GitHub Package Registry. See [installation instructions](https://github.com/defang-io/pulumi-defang/pkgs/npm/pulumi-defang).

## Example

```ts
import { DefangService } from "@defang-io/pulumi-defang/lib";

const service = new DefangService("defang-nginx", {
  // name: "…",                             // defaults to the Pulumi resource name
  image: "nginx:latest",
  ports: [{ target: 80, protocol: "http", mode: "ingress" }],
  // fabricDNS: "…",                        // override the Defang Fabric Controller endpoint
  // platform: "…",                         // "linux/arm64" | "linux/amd64" | "linux" (default)
  // environment: {
  //   RDS_HOST: "rds.endpoint",
  // },
  // deploy: {
  //   replicas: 1,
  //   resources: {
  //     reservations: { cpu: 0.5, memory: 512 },
  //   },
  // },
});

export const id = service.id;
export const urn = service.urn;
export const fqdn = service.fqdn;           // the final FQDN for your service
export const fabricDNS = service.fabricDNS;
```

## Environment Variables

* `DEFANG_ACCESS_TOKEN` - your access token; defaults to the token file from the CLI
* `DEFANG_FABRIC` - override the Defang Fabric service endpoint; defaults to prod
* `DEFANG_FORCE_UP` - set this to `1` or `true` to force an update (for debugging only)
