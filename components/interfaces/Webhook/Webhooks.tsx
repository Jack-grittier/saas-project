import { useSession } from "next-auth/react";
import { Button } from "react-daisyui";
import axios from "axios";
import toast from "react-hot-toast";
import type { EndpointOut } from "svix";

import { Card, Error, Loading } from "@/components/ui";
import { Team } from "@prisma/client";
import useWebhooks from "hooks/useWebhooks";

const Webhooks = ({ team }: { team: Team }) => {
  const { data: session } = useSession();

  const { isLoading, isError, webhooks } = useWebhooks(team.slug);

  if (isLoading || !webhooks) {
    return <Loading />;
  }

  if (isError || !session) {
    return <Error />;
  }

  const deleteWebhook = async (webhook: EndpointOut) => {
    // await axios.delete(`/api/teams/${team.slug}/members`, {
    //   data: {
    //     memberId: member.userId,
    //   },
    // });

    toast.success("Deleted the member successfully.");
  };

  return (
    <Card heading="Team Members">
      <Card.Body>
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                URL
              </th>
              <th scope="col" className="px-6 py-3">
                Version
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {webhooks.map((webhook) => {
              return (
                <tr
                  key={webhook.id}
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-3">{webhook.description}</td>
                  <td className="px-6 py-3">{webhook.url}</td>
                  <td className="px-6 py-3">{webhook.version}</td>
                  <td className="px-6 py-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        deleteWebhook(webhook);
                      }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
};

export default Webhooks;
