export function formatTimestamp(timestamp: number) {
    const date = new Date(timestamp);
    if(timestamp == 0){
        return ""
    }
  
    const options: any = {
    //   year: "numeric",
    //   month: "long",
    //   day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
  
    return date.toLocaleString("en-US", options).replace(",", "");
  }
  
  export function getTimeRemaining(timestamp: number) {
      const currentTime = Date.now();
      const remainingTimeInMs = timestamp - currentTime;
  
      // If the timestamp is in the past, return a specific message
      if (remainingTimeInMs <= 0) {
          return "The timestamp is in the past.";
      }
      if(timestamp == 0){
        return ""
      }
  
      const remainingTimeInMinutes = Math.floor(remainingTimeInMs / (1000 * 60));
      const hours = Math.floor(remainingTimeInMinutes / 60);
      const minutes = remainingTimeInMinutes % 60;
  
      // Construct the result string
      let result = '';
      if (hours > 0) {
          result += `${hours} hour`;
          if (hours > 1) {
              result += 's';
          }
          if (minutes > 0) {
              result += ' & ';
          }
      }
      if (minutes > 0) {
          result += `${minutes} Minutes`;
      }
  
      return result;
  }
  
  export default {};
  