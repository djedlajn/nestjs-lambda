#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AppStack } from "../lib/app-stack";

const app = new cdk.App();

const envEU  = { account: '<AWS>', region: 'eu-west-1' };


const vpnStack = new AppStack(app, "test-lambda-nestjs", {
  env: envEU,
  serviceName: 'test-service'
});
