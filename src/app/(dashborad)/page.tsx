import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Clients</CardTitle>
        </CardHeader>
        <CardContent>24</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Projects</CardTitle>
        </CardHeader>
        <CardContent>12</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Tasks</CardTitle>
        </CardHeader>
        <CardContent>48</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>$8,400</CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
