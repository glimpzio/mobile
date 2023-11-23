import { gql, useMutation, useQuery } from "@apollo/client";
import { Container, Text } from "../../components";
import { COLOR_ZINC_950 } from "../../utils";

interface Data {
    user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        bio: string;
        profilePicture: string | null;
        profile: {
            email: string | null;
            phone: string | null;
            website: string | null;
            linkedin: string | null;
        };
    };
}

export default function Profile() {
    const GET_PROFILE = gql`
        query GetProfile {
            user {
                id
                firstName
                lastName
                email
                bio
                profilePicture
                profile {
                    email
                    phone
                    website
                    linkedin
                }
            }
        }
    `;

    const UPDATE_PROFILE = gql`
        mutation UpdateProfile(
            $firstName: String!
            $lastName: String!
            $email: String!
            $bio: String!
            $profilePicture: String
            $profileEmail: String
            $profilePhone: String
            $profileWebsite: String
            $profileLinkedin: String
        ) {
            upsertUser(
                input: {
                    firstName: $firstName
                    lastName: $lastName
                    email: $email
                    bio: $bio
                    profilePicture: $profilePicture
                    profile: { email: $profileEmail, phone: $profilePhone, website: $profileWebsite, linkedin: $profileLinkedin }
                }
            ) {
                id
                firstName
                lastName
                email
                bio
                profilePicture
                profile {
                    email
                    phone
                    website
                    linkedin
                }
            }
        }
    `;

    const { loading, error, data } = useQuery<Data>(GET_PROFILE);
    const [mutateFunction] = useMutation<Data>(UPDATE_PROFILE);

    if (loading)
        return (
            <Container direction="vertical-center" pad expand style={{ backgroundColor: COLOR_ZINC_950 }}>
                <Text alignment="center" type="normal">
                    Loading...
                </Text>
            </Container>
        );

    if (error)
        return (
            <Container direction="vertical-center" pad expand style={{ backgroundColor: COLOR_ZINC_950 }}>
                <Text alignment="center" type="normal">
                    Failed to fetch data.
                </Text>
            </Container>
        );

    return (
        <Container direction="vertical-start" scroll pad expand style={{ backgroundColor: COLOR_ZINC_950 }}>
            <Text type="normal" alignment="center">
                {JSON.stringify(data)}
            </Text>
        </Container>
    );
}
