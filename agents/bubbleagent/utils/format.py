import json


def agent_return_format(
    data,
    anent_name,
    types="successfully",
):
    if types == "quote":
        return {"agent_name": anent_name, "data": data, "status": types}

    if types == "error":
        return {"agent_name": anent_name, "data": data, "status": "error"}
    if types == "rejected":
        return {"agent_name": anent_name, "data": data, "status": "rejected"}
    return {"agent_name": anent_name, "data": data, "status": "response"}
