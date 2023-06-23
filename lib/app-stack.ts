import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import { Function, Code, Runtime, LayerVersion } from "aws-cdk-lib/aws-lambda";

import { LambdaRestApi } from "aws-cdk-lib/aws-apigateway";

export interface AppStackProps extends cdk.StackProps {
  readonly serviceName: string;
}

export class AppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    const lambdaLayer = new LayerVersion(this, "HandlerLayer", {
      code: Code.fromAsset(path.resolve(__dirname, "../api/node_modules")),
      compatibleRuntimes: [Runtime.NODEJS_18_X],
      description: "NOV NOV NOV",
    });

    const handler = new Function(this, "Handler", {
      code: Code.fromAsset(path.resolve(__dirname, "../api/dist"), {
        exclude: ["node_modules"],
      }),
      handler: "main.handler",
      layers: [lambdaLayer],
      runtime: Runtime.NODEJS_18_X,
      environment: {
        NODE_PATH: "$NODE_PATH:/opt",
      },
    });

    new LambdaRestApi(this, "API_TEST", {
      handler: handler,
    });

    // const api = new RestApi(this, "Api", {
    //   deploy: true,
    //   defaultMethodOptions: {
    //     apiKeyRequired: false,
    //   },
    //   deployOptions: {
    //     stageName: "v1",
    //   },
    // });

    // api.root.addProxy({
    //   defaultIntegration: new LambdaIntegration(handler),
    // });
  }
}
