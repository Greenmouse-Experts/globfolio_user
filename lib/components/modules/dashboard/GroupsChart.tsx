"use client"
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@/lib/components/ui/TailwindComp";
import { getChart } from "@/lib/service/api/routineApi";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { BsStack } from "react-icons/bs";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });


interface ChartProps{
    group_name: string,
    member_no: number
}
export default function TopGroupsChart() {
  // const data = [] as ChartProps[]
  const {data, isLoading} = useQuery({
    queryKey: ['chartData'],
    queryFn: getChart
  })
  const [names, setNames] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);
  useEffect(() => {
    if (data) {
      const name = [] as string[];
      const vals = [] as number[]
      data.metrics.forEach((item:any) => {
          name.push(item.name);
          vals.push(item.messages)
      });
      setNames(name);
      setValues(vals)
    }
  }, [data]);
  
  const chartConfig = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Members",
        data: values,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: names,
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
  return (
    <Card placeholder={""}>
      <CardHeader
        placeholder={""}
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <BsStack className="h-6 w-6" />
        </div>
        <div>
          <Typography placeholder={""} variant="h6" color="blue-gray">
             Chart Room Analytics
          </Typography>
          <Typography
            variant="small"
            placeholder={""}
            color="gray"
            className="max-w-sm font-normal"
          >
            Join the hottest group on Globfolio and don't miss out on valueable informations.
          </Typography>
        </div>
      </CardHeader>
      <CardBody placeholder={""} className="px-2 pb-0">
       {data && <Chart {...chartConfig} type="bar" width={'100%'} height={'300px'} />}
      </CardBody>
    </Card>
  );
}
