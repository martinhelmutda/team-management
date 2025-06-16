export type Member = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    groups: number[];
};

export type MemberForm = Omit<Member, "id">;