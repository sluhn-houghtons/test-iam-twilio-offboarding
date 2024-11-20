import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const {
  API_KEY: twilioApiKey,
  ACCOUNT_API_SECRET: twilioApiSecret,
  ACCOUNT_SID: accountSid,
  WORKSPACE: workspace,
} = process.env;

class TaskRouterHelper {
  client = twilio(twilioApiKey, twilioApiSecret, { accountSid });

  async listWorkers() {
    return await this.client.taskrouter.v1
      .workspaces(workspace)
      .workers.list({ limit: 1000 });
  }
}

const taskRouterHelperInstance = new TaskRouterHelper();
export default taskRouterHelperInstance;
