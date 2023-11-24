import { gql, useMutation, useQuery } from "@apollo/client";
import { StyleSheet, Text, View } from "react-native";

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
            <View>
                <Text>Loading...</Text>
            </View>
        );

    if (error)
        return (
            <View>
                <Text>Failed to fetch data.</Text>
            </View>
        );

    return (
        <View>
            <Text>{JSON.stringify(data)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
