import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class VpcStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props: cdk.StackProps){
            super(scope, id, props)
    }
}