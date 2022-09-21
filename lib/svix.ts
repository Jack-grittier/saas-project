import { Svix, EndpointIn } from "svix";

import env from "./env";

const svix = new Svix(env.svix.apiKey);

export const eventTypes = [
  "member.created",
  "member.removed",
  "invitation.created",
  "invitation.removed",
  "project.created",
  "project.updated",
  "project.removed",
];

export const findOrCreateApp = async (name: string, uid: string) => {
  return await svix.application.getOrCreate({ name, uid });
};

export const createWebhook = async (appId: string, data: EndpointIn) => {
  return await svix.endpoint.create(appId, data);
};

export const updateWebhook = async (
  appId: string,
  endpointId: string,
  data: EndpointIn
) => {
  return await svix.endpoint.update(appId, endpointId, data);
};

export const findWebhook = async (appId: string, endpointId: string) => {
  return await svix.endpoint.get(appId, endpointId);
};

export const listWebhooks = async (appId: string) => {
  return await svix.endpoint.list(appId);
};

export const deleteWebhook = async (appId: string, endpointId: string) => {
  return await svix.endpoint.delete(appId, endpointId);
};
