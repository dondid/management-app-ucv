import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, BarChart3, CheckCircle, Circle, AlertTriangle, Plus, Edit, Trash2, Eye, FileText, Target, Briefcase, TrendingUp } from 'lucide-react';

const ProjectManagementApp = () => {
    // State management
    const [activeTab, setActiveTab] = useState('dashboard');
    const [projects, setProjects] = useState([
        {
            id: 1,
            name: 'Dezvoltare Aplicație Web',
            description: 'Crearea unei aplicații web complete pentru gestionarea clientilor',
            status: 'În progres',
            priority: 'Înaltă',
            startDate: '2024-01-15',
            endDate: '2024-06-30',
            progress: 65,
            budget: 50000,
            spent: 32500,
            manager: 'Ana Popescu',
            team: ['John Doe', 'Maria Ionescu', 'Vasile Georgescu'],
            tasks: [
                { id: 1, name: 'Analiza cerințelor', status: 'Completat', progress: 100, assignee: 'Ana Popescu', startDate: '2024-01-15', endDate: '2024-02-01' },
                { id: 2, name: 'Design UI/UX', status: 'Completat', progress: 100, assignee: 'Maria Ionescu', startDate: '2024-02-01', endDate: '2024-02-20' },
                { id: 3, name: 'Dezvoltare Backend', status: 'În progres', progress: 70, assignee: 'John Doe', startDate: '2024-02-15', endDate: '2024-04-30' },
                { id: 4, name: 'Dezvoltare Frontend', status: 'În progres', progress: 60, assignee: 'Vasile Georgescu', startDate: '2024-03-01', endDate: '2024-05-15' },
                { id: 5, name: 'Testare', status: 'Planificat', progress: 0, assignee: 'Ana Popescu', startDate: '2024-05-01', endDate: '2024-06-15' }
            ]
        },
        {
            id: 2,
            name: 'Implementare ERP',
            description: 'Implementarea sistemului ERP în întreaga organizație',
            status: 'Planificat',
            priority: 'Medie',
            startDate: '2024-03-01',
            endDate: '2024-12-31',
            progress: 25,
            budget: 100000,
            spent: 15000,
            manager: 'Mihai Radu',
            team: ['Elena Stoica', 'Andrei Marin', 'Cristina Pavel'],
            tasks: [
                { id: 6, name: 'Analiză proces business', status: 'În progres', progress: 80, assignee: 'Elena Stoica', startDate: '2024-03-01', endDate: '2024-04-15' },
                { id: 7, name: 'Configurare sistem', status: 'Planificat', progress: 0, assignee: 'Andrei Marin', startDate: '2024-04-15', endDate: '2024-08-30' }
            ]
        }
    ]);

    const [resources, setResources] = useState([
        { id: 1, name: 'Ana Popescu', role: 'Project Manager', availability: 80, cost: 200 },
        { id: 2, name: 'John Doe', role: 'Backend Developer', availability: 100, cost: 150 },
        { id: 3, name: 'Maria Ionescu', role: 'UI/UX Designer', availability: 90, cost: 120 },
        { id: 4, name: 'Vasile Georgescu', role: 'Frontend Developer', availability: 85, cost: 140 }
    ]);

    const [newProject, setNewProject] = useState({
        name: '',
        description: '',
        priority: 'Medie',
        startDate: '',
        endDate: '',
        budget: '',
        manager: ''
    });

    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    // Calculări pentru dashboard
    const totalProjects = projects.length;
    const activeProjects = projects.filter(p => p.status === 'În progres').length;
    const completedProjects = projects.filter(p => p.status === 'Completat').length;
    const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);

    // Componente pentru diferite taburi
    const Dashboard = () => (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard - Prezentare Generală</h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100">Total Proiecte</p>
                            <p className="text-3xl font-bold">{totalProjects}</p>
                        </div>
                        <Briefcase className="h-8 w-8 text-blue-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100">Proiecte Active</p>
                            <p className="text-3xl font-bold">{activeProjects}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100">Buget Total</p>
                            <p className="text-3xl font-bold">{totalBudget.toLocaleString()} RON</p>
                        </div>
                        <Target className="h-8 w-8 text-purple-200" />
                    </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-orange-100">Cheltuieli</p>
                            <p className="text-3xl font-bold">{totalSpent.toLocaleString()} RON</p>
                        </div>
                        <BarChart3 className="h-8 w-8 text-orange-200" />
                    </div>
                </div>
            </div>

            {/* Grafic progres proiecte */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Progresul Proiectelor</h3>
                <div className="space-y-4">
                    {projects.map(project => (
                        <div key={project.id} className="flex items-center space-x-4">
                            <div className="w-32 text-sm font-medium">{project.name}</div>
                            <div className="flex-1 bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${project.progress}%` }}
                                ></div>
                            </div>
                            <div className="w-16 text-sm text-gray-600">{project.progress}%</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Status proiecte */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Distribuția pe Status</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="flex items-center"><Circle className="h-4 w-4 text-blue-500 mr-2" />În progres</span>
                            <span className="font-semibold">{activeProjects}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2" />Completat</span>
                            <span className="font-semibold">{completedProjects}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="flex items-center"><Clock className="h-4 w-4 text-yellow-500 mr-2" />Planificat</span>
                            <span className="font-semibold">{totalProjects - activeProjects - completedProjects}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Utilizarea Bugetului</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Buget Total:</span>
                            <span className="font-semibold">{totalBudget.toLocaleString()} RON</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Cheltuit:</span>
                            <span className="font-semibold text-red-600">{totalSpent.toLocaleString()} RON</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Rămas:</span>
                            <span className="font-semibold text-green-600">{(totalBudget - totalSpent).toLocaleString()} RON</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-gradient-to-r from-red-400 to-red-500 h-3 rounded-full"
                                style={{ width: `${(totalSpent / totalBudget) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const ProjectsList = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Gestiunea Proiectelor</h2>
                <button
                    onClick={() => setShowNewProjectModal(true)}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
                >
                    <Plus className="h-4 w-4" />
                    <span>Proiect Nou</span>
                </button>
            </div>

            <div className="grid gap-6">
                {projects.map(project => (
                    <div key={project.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                                <p className="text-gray-600 mt-1">{project.description}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setSelectedProject(project)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                    project.status === 'Completat' ? 'bg-green-100 text-green-800' :
                                        project.status === 'În progres' ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'
                                }`}>
                  {project.status}
                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Prioritate</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                    project.priority === 'Înaltă' ? 'bg-red-100 text-red-800' :
                                        project.priority === 'Medie' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                }`}>
                  {project.priority}
                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Manager</p>
                                <p className="font-medium">{project.manager}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Progres</p>
                                <p className="font-medium">{project.progress}%</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                    {project.startDate} - {project.endDate}
                </span>
                                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                                    {project.team.length} membri
                </span>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Buget: {project.budget.toLocaleString()} RON</p>
                                <p className="text-sm text-gray-500">Cheltuit: {project.spent.toLocaleString()} RON</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span>Progres general</span>
                                <span>{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${project.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const TaskManagement = () => {
        const allTasks = projects.flatMap(project =>
            project.tasks.map(task => ({ ...task, projectName: project.name, projectId: project.id }))
        );

        return (
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">Gestiunea Activităților</h2>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activitate</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proiect</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsabil</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progres</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Termen</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {allTasks.map(task => (
                                <tr key={`${task.projectId}-${task.id}`} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{task.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{task.projectName}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{task.assignee}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          task.status === 'Completat' ? 'bg-green-100 text-green-800' :
                              task.status === 'În progres' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.status}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full"
                                                    style={{ width: `${task.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-sm text-gray-600">{task.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {task.endDate}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    const ResourceManagement = () => (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Gestiunea Resurselor</h2>

            <div className="grid gap-6">
                {resources.map(resource => (
                    <div key={resource.id} className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">{resource.name}</h3>
                                <p className="text-gray-600">{resource.role}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">Cost/zi: {resource.cost} RON</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Disponibilitate</p>
                                <div className="flex items-center">
                                    <div className="w-full bg-gray-200 rounded-full h-3 mr-3">
                                        <div
                                            className={`h-3 rounded-full ${
                                                resource.availability >= 80 ? 'bg-green-500' :
                                                    resource.availability >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                            style={{ width: `${resource.availability}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-medium">{resource.availability}%</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-1">Status</p>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                    resource.availability >= 80 ? 'bg-green-100 text-green-800' :
                                        resource.availability >= 50 ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-red-100 text-red-800'
                                }`}>
                  {resource.availability >= 80 ? 'Disponibil' :
                      resource.availability >= 50 ? 'Parțial ocupat' : 'Ocupat'}
                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const Reports = () => (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Rapoarte și Analize</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Performanța Proiectelor</h3>
                    <div className="space-y-4">
                        {projects.map(project => (
                            <div key={project.id} className="border-b pb-3 last:border-b-0">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">{project.name}</span>
                                    <span className="text-sm text-gray-600">{project.progress}%</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Buget utilizat:</span>
                                        <span className="ml-2 font-medium">{((project.spent / project.budget) * 100).toFixed(1)}%</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Eficiență:</span>
                                        <span className={`ml-2 font-medium ${
                                            project.progress >= (project.spent / project.budget) * 100 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                      {project.progress >= (project.spent / project.budget) * 100 ? 'Bună' : 'Scăzută'}
                    </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Analiza Riscurilor</h3>
                    <div className="space-y-3">
                        <div className="flex items-center p-3 bg-red-50 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
                            <div>
                                <p className="font-medium text-red-800">Risc Înalt</p>
                                <p className="text-sm text-red-600">Proiecte cu buget depășit</p>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                            <Clock className="h-5 w-5 text-yellow-500 mr-3" />
                            <div>
                                <p className="font-medium text-yellow-800">Risc Mediu</p>
                                <p className="text-sm text-yellow-600">Întârzieri în livrare</p>
                            </div>
                        </div>
                        <div className="flex items-center p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                            <div>
                                <p className="font-medium text-green-800">Risc Scăzut</p>
                                <p className="text-sm text-green-600">Proiecte în grafic</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Raport Financiar</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left">Proiect</th>
                            <th className="px-4 py-2 text-right">Buget</th>
                            <th className="px-4 py-2 text-right">Cheltuit</th>
                            <th className="px-4 py-2 text-right">Rămas</th>
                            <th className="px-4 py-2 text-right">% Utilizat</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projects.map(project => (
                            <tr key={project.id} className="border-b">
                                <td className="px-4 py-2">{project.name}</td>
                                <td className="px-4 py-2 text-right">{project.budget.toLocaleString()} RON</td>
                                <td className="px-4 py-2 text-right">{project.spent.toLocaleString()} RON</td>
                                <td className="px-4 py-2 text-right">{(project.budget - project.spent).toLocaleString()} RON</td>
                                <td className="px-4 py-2 text-right">
                    <span className={`font-medium ${
                        (project.spent / project.budget) * 100 > 80 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {((project.spent / project.budget) * 100).toFixed(1)}%
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const addProject = () => {
        if (newProject.name && newProject.description) {
            const project = {
                id: projects.length + 1,
                ...newProject,
                budget: parseInt(newProject.budget),
                status: 'Planificat',
                progress: 0,
                spent: 0,
                team: [],
                tasks: []
            };
            setProjects([...projects, project]);
            setNewProject({
                name: '',
                description: '',
                priority: 'Medie',
                startDate: '',
                endDate: '',
                budget: '',
                manager: ''
            });
            setShowNewProjectModal(false);
        }
    };

    const tabs = [
        { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
        { id: 'projects', name: 'Proiecte', icon: Briefcase },
        { id: 'tasks', name: 'Activități', icon: CheckCircle },
        { id: 'resources', name: 'Resurse', icon: Users },
        { id: 'reports', name: 'Rapoarte', icon: FileText }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Aplicația de Management de Proiecte</h1>
                            <p className="text-gray-600">Sistem complet pentru gestiunea proiectelor</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-600">Total Proiecte Active</p>
                                <p className="text-xl font-bold text-blue-600">{activeProjects}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 ${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{tab.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'projects' && <ProjectsList />}
                {activeTab === 'tasks' && <TaskManagement />}
                {activeTab === 'resources' && <ResourceManagement />}
                {activeTab === 'reports' && <Reports />}
            </main>

            {/* Modal pentru proiect nou */}
            {showNewProjectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-semibold mb-4">Adaugă Proiect Nou</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nume Proiect</label>
                                <input
                                    type="text"
                                    value={newProject.name}
                                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Introduceți numele proiectului"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descriere</label>
                                <textarea
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    rows="3"
                                    placeholder="Descrierea proiectului"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prioritate</label>
                                    <select
                                        value={newProject.priority}
                                        onChange={(e) => setNewProject({...newProject, priority: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="Scăzută">Scăzută</option>
                                        <option value="Medie">Medie</option>
                                        <option value="Înaltă">Înaltă</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
                                    <input
                                        type="text"
                                        value={newProject.manager}
                                        onChange={(e) => setNewProject({...newProject, manager: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Numele managerului"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Start</label>
                                    <input
                                        type="date"
                                        value={newProject.startDate}
                                        onChange={(e) => setNewProject({...newProject, startDate: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Data Finalizare</label>
                                    <input
                                        type="date"
                                        value={newProject.endDate}
                                        onChange={(e) => setNewProject({...newProject, endDate: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Buget (RON)</label>
                                <input
                                    type="number"
                                    value={newProject.budget}
                                    onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Bugetul proiectului"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={() => setShowNewProjectModal(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Anulează
                            </button>
                            <button
                                onClick={addProject}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Adaugă Proiect
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal pentru detalii proiect */}
            {selectedProject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-semibold">{selectedProject.name}</h3>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <span className="sr-only">Închide</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-700">Informații Generale</h4>
                                    <div className="mt-2 space-y-2 text-sm">
                                        <p><span className="font-medium">Descriere:</span> {selectedProject.description}</p>
                                        <p><span className="font-medium">Manager:</span> {selectedProject.manager}</p>
                                        <p><span className="font-medium">Status:</span>
                                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                                selectedProject.status === 'Completat' ? 'bg-green-100 text-green-800' :
                                                    selectedProject.status === 'În progres' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                            }`}>
                        {selectedProject.status}
                      </span>
                                        </p>
                                        <p><span className="font-medium">Prioritate:</span>
                                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                                selectedProject.priority === 'Înaltă' ? 'bg-red-100 text-red-800' :
                                                    selectedProject.priority === 'Medie' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-green-100 text-green-800'
                                            }`}>
                        {selectedProject.priority}
                      </span>
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-700">Perioada</h4>
                                    <div className="mt-2 text-sm">
                                        <p><span className="font-medium">Start:</span> {selectedProject.startDate}</p>
                                        <p><span className="font-medium">Finalizare:</span> {selectedProject.endDate}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-semibold text-gray-700">Informații Financiare</h4>
                                    <div className="mt-2 space-y-2 text-sm">
                                        <p><span className="font-medium">Buget Total:</span> {selectedProject.budget.toLocaleString()} RON</p>
                                        <p><span className="font-medium">Cheltuit:</span> {selectedProject.spent.toLocaleString()} RON</p>
                                        <p><span className="font-medium">Rămas:</span> {(selectedProject.budget - selectedProject.spent).toLocaleString()} RON</p>
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Utilizare buget</span>
                                            <span>{((selectedProject.spent / selectedProject.budget) * 100).toFixed(1)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full"
                                                style={{ width: `${(selectedProject.spent / selectedProject.budget) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-700">Echipa</h4>
                                    <div className="mt-2">
                                        {selectedProject.team.map((member, index) => (
                                            <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mr-2 mb-1">
                        {member}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-700 mb-3">Progresul Proiectului</h4>
                            <div className="flex justify-between text-sm mb-1">
                                <span>Progres general</span>
                                <span>{selectedProject.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
                                    style={{ width: `${selectedProject.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-700 mb-3">Activități</h4>
                            <div className="space-y-3">
                                {selectedProject.tasks.map(task => (
                                    <div key={task.id} className="border rounded-lg p-3">
                                        <div className="flex justify-between items-start mb-2">
                                            <h5 className="font-medium">{task.name}</h5>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                task.status === 'Completat' ? 'bg-green-100 text-green-800' :
                                                    task.status === 'În progres' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                            }`}>
                        {task.status}
                      </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                            <p><span className="font-medium">Responsabil:</span> {task.assignee}</p>
                                            <p><span className="font-medium">Termen:</span> {task.endDate}</p>
                                        </div>
                                        <div className="mt-2">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>Progres</span>
                                                <span>{task.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full"
                                                    style={{ width: `${task.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectManagementApp;