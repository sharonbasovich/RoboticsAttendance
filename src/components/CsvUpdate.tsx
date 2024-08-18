import axios, { AxiosResponse, AxiosError } from "axios";

interface Props {
    nameToAdd: string;
    hoursToAdd: number;
}

function CsvUpdater({nameToAdd, hoursToAdd}: Props) {
  const addRowToCsv = (name :string, hours: string) => {
    axios
      .post<{ message: string }>("/add-row", { name, hours })
      .then((response: AxiosResponse<{ message: string }>) => {
        console.log(response.data.message);
      })
      .catch((error: AxiosError) => {
        console.error("There was an error!", error);
      });
  };

  addRowToCsv(nameToAdd, hoursToAdd.toString())

  return (
    <div>
    </div>
  );
}

export default CsvUpdater;
