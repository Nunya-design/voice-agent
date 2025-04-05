import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Voice Agent Dashboard</h1>

      <Tabs defaultValue="calls" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="calls">Recent Calls</TabsTrigger>
          <TabsTrigger value="log">Log New Call</TabsTrigger>
        </TabsList>

        <TabsContent value="calls">
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold mb-2">Recent Conversations</h2>
              <p className="text-sm text-muted-foreground">No calls logged yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="log">
          <Card className="mb-4">
            <CardContent className="space-y-4 p-4">
              <h2 className="text-xl font-semibold">Log a New Call</h2>
              <Input placeholder="Caller Name" />
              <Input placeholder="Phone Number" />
              <Textarea placeholder="Call Notes" />
              <Button>Save Call</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}


