import { SquidService } from '@squidcloud/backend';
export declare class ExampleService extends SquidService {
    allowAccessToBuiltInDb(): boolean;
    askQuestion(question: string): Promise<string>;
}
