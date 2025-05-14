 
 export const Style=()=>{
    return (
    <style>
        {`
          @keyframes glow {
            0%, 100% {
              box-shadow: 0 0 5px #ff6600, 0 0 25px #ff6600;
            }
            50% {
              box-shadow: 0 0 15px #ff6600, 0 0 50px #ff6600;
            }
          }
          .glow-border {
            animation: glow 2s infinite ease-in-out;
          }
        `}
</style>
    );
        };