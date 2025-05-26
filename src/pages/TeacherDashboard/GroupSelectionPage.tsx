import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, ArrowRight, AlertCircle, Loader2 } from "lucide-react";

// Assuming these components are imported from your project
import { Card } from "./components/ui/card";
import { CardHeader } from "./components/ui/card";
import { CardTitle } from "./components/ui/card";
import { CardDescription } from "./components/ui/card";
import { CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Alert } from "./components/ui/alert";
import { AlertDescription } from "./components/ui/alert";

// Define the Group interface
interface Group {
  id: string;
  name: string;
  description?: string;
  studentCount?: number;
  level?: string;
}

const staticGroups: Group[] = [
  {
    id: "6B29FC40-CA47-1067-B31D-00DD010662DA",
    name: "Groupe A - Informatique",
    description: "Étudiants en première année informatique",
    studentCount: 28,
    level: "L1",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Groupe B - Mathématiques",
    description: "Étudiants en deuxième année mathématiques",
    studentCount: 25,
    level: "L2",
  },
  {
    id: "6B29FC40-CA47-1067-B31D-00DD010662DA",
    name: "Groupe A - Informatique",
    description: "Étudiants en première année informatique",
    studentCount: 28,
    level: "L1",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Groupe B - Mathématiques",
    description: "Étudiants en deuxième année mathématiques",
    studentCount: 25,
    level: "L2",
  },
  {
    id: "6B29FC40-CA47-1067-B31D-00DD010662DA",
    name: "Groupe A - Informatique",
    description: "Étudiants en première année informatique",
    studentCount: 28,
    level: "L1",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Groupe B - Mathématiques",
    description: "Étudiants en deuxième année mathématiques",
    studentCount: 25,
    level: "L2",
  },
  {
    id: "6B29FC40-CA47-1067-B31D-00DD010662DA",
    name: "Groupe A - Informatique",
    description: "Étudiants en première année informatique",
    studentCount: 28,
    level: "L1",
  },
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Groupe B - Mathématiques",
    description: "Étudiants en deuxième année mathématiques",
    studentCount: 25,
    level: "L2",
  },
];

function GroupSelectionPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadStaticGroups();
  }, []);

  const loadStaticGroups = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setGroups(staticGroups);
    } catch (error) {
      setError("Failed to load groups. Please try again.");
      console.error("Error loading groups:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGroupSelect = (groupId: string): void => {
    navigate(`/Teacherdashboard/groups/${groupId}/notes`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-800">Group Selection</h1>
            <p className="text-gray-600">Choose a group to manage student notes</p>
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 ml-2">{error}</AlertDescription>
            </Alert>
          )}

          {groups.length === 0 && !error ? (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No groups found</h3>
              <p className="text-gray-600">There are currently no groups available.</p>
              <Button onClick={loadStaticGroups} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                Refresh
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <Card
                  key={group.id}
                  className="border-2 transition-all duration-200 border-gray-200 hover:border-blue-500 flex flex-col "
                >
                  <CardHeader className="bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5" />
                      {group.name}
                    </CardTitle>
                    <CardDescription className="hover:text-white/90">{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Level:</span>
                        <span className="text-sm font-medium text-gray-800">{group.level}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Students:</span>
                        <span className="text-sm font-medium text-gray-800">{group.studentCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">ID:</span>
                        <span className="text-xs font-mono text-gray-500">{group.id.slice(0, 8)}...</span>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => handleGroupSelect(group.id)}
                    >
                      Select this group
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupSelectionPage;