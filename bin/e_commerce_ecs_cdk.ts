#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EcrStack } from '../lib/ecr-stack';

const app = new cdk.App();

const env: cdk.Environment = {
  account: "471112844480",
  region: "us-east-1"
}

const tagsInfra = {
  cost: "EcommerceInfra",
  team: "SquadTeamName"
}

const ecrStack = new EcrStack(app, "Ecr", {
  env: env,
  tags: tagsInfra
})
