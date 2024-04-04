import {
  BadgeDelta,
  Card,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from "@tremor/react";
import Image from "next/image";
import React, { useLayoutEffect, useState } from "react";

type GoalDataCardProps = {
  name: string;
  amount: number;
};

type CardDataProps = {
  name: string;
  textContent: string;
  isDollarAmount?: boolean;
}

type UserDataCardProps = {
  name: string;
  avatar: string;
  textContent: string;
}

export interface IRecentActivityItem {
  id: number;
  type: string;
  description: string;
  date: string;
}

const GoalDataCard = (props: GoalDataCardProps) => {
  const { name, amount } = props;
  return (
    <div>
      <Card className="mx-auto max-w-lg">
        <Flex alignItems="start">
          <div>
            <Text>{name}</Text>
            <Metric>$ {amount}</Metric>
          </div>
          <BadgeDelta deltaType="moderateIncrease">13.2%</BadgeDelta>
        </Flex>
        <Flex className="mt-4">
          <Text className="truncate">68% ($ 149,940)</Text>
          <Text>$ 220,500</Text>
        </Flex>
        <ProgressBar value={15.9} className="mt-2" />
      </Card>
    </div>
  );
};

const DataCard = (props: CardDataProps) => {
  const [dollarAmount, setDollarAmount] = useState<string>("0");
  const { name, textContent, isDollarAmount } = props;
  useLayoutEffect(
    () => {
      if(isDollarAmount) {
        const formattedAmount = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(parseInt(textContent));
        setDollarAmount(formattedAmount);
      }
    }, []
  )
  return (
    <div>
      <Card className="mx-auto max-w-lg">
        <Flex alignItems="start">
          <div>
            <Text>{name}</Text>
            {isDollarAmount ? <Metric>{dollarAmount}</Metric> : <Metric>{new Intl.NumberFormat('en-US').format(parseFloat(textContent))}</Metric>}
          </div>
        </Flex>
      </Card>
    </div>
  );
};


const UserDataCard = (props: UserDataCardProps) => {
  const { name, textContent, avatar } = props;
  return (
    <div>
      <Card className="mx-auto max-w-lg">
        <Flex alignItems="start">
          <div>
            <Text>{name}</Text>
            <Image src={avatar} alt="User" width={60} height={60} />
            <Metric>{textContent}</Metric>
          </div>
        </Flex>
      </Card>
    </div>
  );
};

export { UserDataCard, GoalDataCard, DataCard };

