export const DEMO_CHART_WEB_SOCKET_URL =
  process.env.NEXT_PUBLIC__DEMO_CHART_SOCKET;

export const enum DeAgentTypes {
  de_agent_one = "get_token_price",
  de_agent_two = "get_trading_volume_info",
  de_agent_three = "get_crypto_news",
  de_agent_four = "get_tvl_info_of_DeFi_protocol",
}
