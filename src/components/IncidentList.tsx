import React, { useState } from 'react';
import './IncidentList.css';

interface Incident {
  id: number;
  title: string;
  description: string;
  severity: string;
  reported_at: string;
}

const IncidentList: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 1,
      title: "Biased Recommendation Algorithm",
      description: "Algorithm consistently favored certain demographics...",
      severity: "Medium",
      reported_at: "2025-03-15T10:00:00Z"
    },
    {
      id: 2,
      title: "LLM Hallucination in Critical Info",
      description: "LLM provided incorrect safety procedure information...",
      severity: "High",
      reported_at: "2025-04-01T14:30:00Z"
    },
    {
      id: 3,
      title: "Minor Data Leak via Chatbot",
      description: "Chatbot inadvertently exposed non-sensitive user metadata...",
      severity: "Low",
      reported_at: "2025-03-20T09:15:00Z"
    }
  ]);

  const [expandedIncidents, setExpandedIncidents] = useState<number[]>([]);
  const [isGridView, setIsGridView] = useState<boolean>(true);
  const [filterSeverity, setFilterSeverity] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('Newest');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const [newIncident, setNewIncident] = useState({
    title: '',
    description: '',
    severity: 'Medium',
  });

  const toggleDescription = (id: number) => {
    setExpandedIncidents((prevState) =>
      prevState.includes(id)
        ? prevState.filter((incidentId) => incidentId !== id)
        : [...prevState, id]
    );
  };

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const handleSeverityFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterSeverity(e.target.value);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewIncident(prev => ({ ...prev, [name]: value }));
  };

  const handleAddIncident = (e: React.FormEvent) => {
    e.preventDefault();
    const incident: Incident = {
      id: incidents.length + 1,
      title: newIncident.title,
      description: newIncident.description,
      severity: newIncident.severity,
      reported_at: new Date().toISOString(),
    };
    setIncidents([incident, ...incidents]);
    setNewIncident({ title: '', description: '', severity: 'Medium' });
    setShowAddForm(false);
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 'severity-low';
      case 'Medium':
        return 'severity-medium';
      case 'High':
        return 'severity-high';
      default:
        return '';
    }
  };

  const filteredAndSortedIncidents = () => {
    let temp = filterSeverity
      ? incidents.filter((incident) => incident.severity === filterSeverity)
      : [...incidents];

    temp.sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();

      if (sortOrder === 'Newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    return temp;
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-3">
        <button
          className="btn toggle-view-btn"
          onClick={toggleView}
        >
          {isGridView ? 'Switch to Table View' : 'Switch to Grid View'}
        </button>

        <div className="form-group d-flex align-items-center">
          <label className="filter-label me-2">Filter by Severity:</label>
          <select
            className="form-select"
            value={filterSeverity}
            onChange={handleSeverityFilterChange}
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-group d-flex align-items-center">
          <label className="filter-label me-2">Sort by Date:</label>
          <select
            className="form-select"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="Newest">Newest to Oldest</option>
            <option value="Oldest">Oldest to Newest</option>
          </select>
        </div>

        <button
          className="btn add-incident-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add Incident'}
        </button>
      </div>

      {showAddForm && (
  <form className="add-incident-form mb-4 animate-slide" onSubmit={handleAddIncident}>
    <div className="add-incident-form-heading">Add Incident</div> {/* NEW */}
    <div className="add-incident-form-body"> {/* NEW */}
      <div className="row g-3">
        <div className="col-md-4">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Title"
            value={newIncident.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-md-4">
          <select
            name="severity"
            className="form-select"
            value={newIncident.severity}
            onChange={handleInputChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="col-md-12">
          <textarea
            name="description"
            className="form-control"
            placeholder="Description"
            value={newIncident.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="col-md-12 d-flex justify-content-end">
          <button type="submit" className="btn submit-incident-btn">
            Submit
          </button>
        </div>
      </div>
    </div> {/* Close form-body */}
  </form>
)}


      <div className={`incident-list ${isGridView ? 'grid-view' : 'table-view'}`}>
        {filteredAndSortedIncidents().length > 0 ? (
          filteredAndSortedIncidents().map((incident) => (
            <div key={incident.id} className={`incident-box ${isGridView ? '' : 'full-width'}`}>
              <div className="incident-header">
                <h5>{incident.title}</h5>
                <span className={`severity-box ${getSeverityClass(incident.severity)}`}>
                  {incident.severity}
                </span>
              </div>
              <div>
                <span className="incident-date">
                  {new Date(incident.reported_at).toLocaleDateString()}
                </span>
              </div>
              <button
                className="btn view-description-btn"
                onClick={() => toggleDescription(incident.id)}
              >
                {expandedIncidents.includes(incident.id) ? 'Hide Description' : 'View Description'}
              </button>

              {expandedIncidents.includes(incident.id) && (
                <div className="incident-description">
                  <strong>Description: </strong>
                  {incident.description}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-incidents-msg">
            No incidents found for selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentList;
