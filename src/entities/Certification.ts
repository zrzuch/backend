import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: 'Education data' })
export class Certification {
    @Field()
    name: string;

    @Field()
    company: string;

    @Field()
    issued: string;

    @Field()
    expires: string;

    @Field()
    id: string;
}