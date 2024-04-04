import {
  BadgeDelta,
  Card,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react";
import { useState } from "react";

type CommonTextProps = {
  name: string;
  description: string;
};

const HeaderTextCard = (props: CommonTextProps) => {
  const { name, description } = props;

  return (
      <Card>
        <Flex alignItems="start">
          <div>
            <Metric>{name}</Metric>
            <Text>{description}</Text>
          </div>
        </Flex>
      </Card>
  );
};


const TextCard = (props: CommonTextProps) => {
  const { name, description } = props;

  return (
      <Card>
        <Flex alignItems="start">
          <div>
            <Text>{name}</Text>
            <Metric>{description}</Metric>
          </div>
        </Flex>
      </Card>
  );
};

type ServiceTextProp = {
  services: string[];
}
const ServiceTextCard = (props: ServiceTextProp) => {
  const { services } = props;

  return (
      <Card>
        <Flex alignItems="start">
          <div>
            <Text>Services Provided</Text>
            {services.map((service: string, idx: number) => (
              <h2 key={idx}><b>•{service}</b></h2>
            ))}
          </div>
        </Flex>
      </Card>
  );
};

export { HeaderTextCard, ServiceTextCard, TextCard };
