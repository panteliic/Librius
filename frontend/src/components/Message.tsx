function Message() {

    const sender = true;

  return (
    <div className={`max-w-4/5 ${sender ? " text-pretty bg-[#00000021] w-auto px-4 py-2 rounded-md self-end": ""}`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, perspiciatis deleniti porro accusantium consectetur recusandae vitae adipisci earum nemo dolor officiis aspernatur amet, vel, sint deserunt dolorum commodi architecto illo.
    </div>
  )
}

export default Message
