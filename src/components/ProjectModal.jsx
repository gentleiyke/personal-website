export default function ProjectModal({ repo, onClose }) {

if (!repo) return null

return (

<div className="modal fade show d-block">

<div className="modal-dialog modal-lg">

<div className="modal-content">

<div className="modal-header">

<h5 className="modal-title">
{repo.name}
</h5>

<button
className="btn-close"
onClick={onClose}
/>

</div>

<div className="modal-body">

<img
src={repo.thumbnail}
className="img-fluid mb-3"
/>

<p>
{repo.description}
</p>

<p>

<strong>Language:</strong> {repo.language}

</p>

<p>

<strong>Stars:</strong> {repo.stars}

</p>

</div>

<div className="modal-footer">

<a
href={repo.url}
target="_blank"
className="btn btn-brand"
>

View on GitHub

</a>

</div>

</div>

</div>

</div>

)

}