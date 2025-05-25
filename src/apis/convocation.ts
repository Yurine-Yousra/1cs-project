interface ConvocationData {
    studentId: string | undefined;
  titre: string;
  motif: string;
  date: string;
}
export const sendConvocation = async (data: ConvocationData) => {
    const token = localStorage.getItem('token')

  try {
    const response = await fetch(`http://localhost:5080/api/teacher/reports/add`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId : data.studentId,
        title : data.titre,
        description : data.motif,
        reportDate : data.date
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Failed to send convocation:', error);
    throw error;
  }
};
