export default function PageHead({ title, text }) {
  return (
    <div className="page-head">
      <div className="wrap" data-aos="fade-up">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
}
