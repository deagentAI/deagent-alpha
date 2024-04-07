import { Api } from "@utils/api";

/**
 * @description
 * @param params
 * @returns
 */
export const postSubscribeApi = async <T>(email: string) => {
  try {
    const res = await Api(`/api/v1/email/saveEmail?email=${email}`).get();
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAgentListApi = async () => {
  try {
    const res = await Api("/api/v1/agent/list").get();
    return res;
  } catch (error) {
    throw error;
  }
};


export const getAgentQuestionsApi = async () => {
  try {
    const res = await Api("/api/v1/agent/further_questions").get();
    return res;
  } catch (error) {
    throw error;
  }
};
