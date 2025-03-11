import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";
import { Button } from "./button";

function TestPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
          <CardDescription>This is a simple test card using our Card and Button components.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Let's see if everything works properly!</p>
        </CardContent>
        <CardFooter>
          <Button variant="default">Click Me</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default TestPage;
