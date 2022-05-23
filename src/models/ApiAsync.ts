import axios, { AxiosPromise } from "axios";

interface UserId {
  id?: number;
}

export class ApiAsync<T extends UserId> {
  store = async (data: T, url: string): Promise<AxiosPromise> => {
    if (JSON.stringify(data) === JSON.stringify({}))
      throw new Error("The user isn't entered!");

    const id = data.id;

    if (!id) {
      return await axios.post(url, data);
    } else {
      return await axios.put(`${url}/${id}`, data);
    }
  };

  fetch = async (id: number, url: string): Promise<AxiosPromise> => {
    if (!id) throw new Error("You should enter the ID");

    return await axios.get(`${url}/${id}`);
  };
}
