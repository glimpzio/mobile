import { gql, useQuery } from "@apollo/client";
import { Button, Text, View } from "react-native";
import { useAuth } from "../../hooks";

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

    const { loading, error, data } = useQuery<Data>(GET_PROFILE);

    return (
        <View>
            <Text>Profile</Text>
            <Text>{JSON.stringify(data)}</Text>
        </View>
    );
}
