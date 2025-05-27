import  { useState, useEffect } from "react";
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
import { GetStudentGroup, GroupResponse } from "../../apis/group.api";

interface GroupSelectionPageProps {
  tab: string;
}


function GroupSelectionPage({tab}:GroupSelectionPageProps) {
  const [groups, setGroups] = useState<GroupResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  const fetchClasses = async () => {
        
    try {
      const data: GroupResponse[] = await GetStudentGroup();
      setGroups(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setError(error)
    } finally {
      setIsLoading(false)
    }
  };
  
    useEffect(() => {
     
      fetchClasses();
    }, []);

 
  const handleGroupSelect = (groupId: string): void => {
    navigate(`/Teacherdashboard/groups/${groupId}/${tab}`);
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
              <Button onClick={fetchClasses} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                Refresh
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <Card
                  key={group.groupId}
                  className="border-2 transition-all duration-200 border-gray-200 hover:border-blue-500 flex flex-col "
                >
                  <CardHeader className="bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5" />
                      {group.groupName}
                    </CardTitle>
                    <CardDescription className="hover:text-white/90">{group.groupCapacity}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Level:</span>
                        <span className="text-sm font-medium text-gray-800">{group.levelId}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Students:</span>
                        <span className="text-sm font-medium text-gray-800">{group.studentCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">ID:</span>
                        <span className="text-xs font-mono text-gray-500">{group.groupId.slice(0, 8)}...</span>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => handleGroupSelect(group.groupId)}
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